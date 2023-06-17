import React from "react";
import "./planPage.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { app } from "../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice/userSlice";

const PlanPage = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  //fetch subscription
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customers", user.uid, "subscriptions"),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setSubscription({
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds,
          });
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  console.log(subscription);

  //fetch products
  useEffect(() => {
    const loadProducts = async () => {
      const productsQuery = query(
        collection(db, "products"),
        where("active", "==", true)
      );
      const unsubscribe = onSnapshot(productsQuery, async (snapshot) => {
        const products = {};
        for (const doc of snapshot.docs) {
          products[doc.id] = doc.data();
          // const productData = doc.data();
          const priceQuery = query(
            collection(db, "products", doc.id, "prices")
          );
          const priceSnapshot = await getDocs(priceQuery);
          // const prices = {};
          priceSnapshot.forEach((priceDoc) => {
            //prices[priceDoc.id] = priceDoc.data();
            products[doc.id].prices = {
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            };
          });
          //   products[doc.id] = {
          //     id: doc.id,
          //     ...productData,
          //     price: prices,
          //   };
        }
        setProducts(products);
      });

      return unsubscribe;
    };

    loadProducts();
  }, []);

  //console.log(products);

  const loadCheckout = async (priceId) => {
    const checkoutSessionRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(checkoutSessionRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51H0MNBInoUBHUu7cpoNNZmAfrr5Q8m6EL6kBjZogb3XSNwqvziopkvO7LmbvoBlhVSNkMqQlxvSHt1GrKj2SXlam00Gcx96Khd"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planPage">
      {subscription && (
        <p>
          {" "}
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        //check if user subscription is active

        const isCurrentPackage = subscription?.role === productData.role;

        return (
          <div className="planPage__plan" key={productId}>
            <div className="planPage__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              className={`${
                isCurrentPackage && "planPage__button--disabled"
              } planPage__button`}
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanPage;
