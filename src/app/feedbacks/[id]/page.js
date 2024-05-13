"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";

export default function CheckFeedbacksPage() {
  const { id } = useParams();
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    if (id) {
      fetch("/api/checkfeedbacks?_id=" + id).then((res) => {
        res.json().then((feedbackData) => {
          setFeedback(feedbackData);
        });
      });
    }
  }, [id]);

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} className="max-w-3xl mx-auto"/>
      {feedback && (
        <div className="max-w-2xl mx-auto">
        <div>
          <div>
            <label>Név</label>
            <div className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">{feedback.name}</div>
          </div>
          <div className="mt-2">
            <label>Email</label>
            <div className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">{feedback.email}</div>
          </div>

          <div className="mt-2">
          <label>Kérdések</label>
            <div  className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">
            <div>
            {feedback.questionone}         
            </div>
            <div className="py-1">
            <li>
            {feedback.answerone} 
            </li>
            </div>
            </div>

            <div className="mt-2">
            <div  className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">
            <div>
            {feedback.questionfour}         
            </div>
            <div className="py-1">
            <li>
            {feedback.answerfour} 
            </li>
            </div>
            </div>
            </div>

            <div className="mt-2">
            <div  className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">
            <div>
            {feedback.questionfour}         
            </div>
            <div className="py-1">
            <li>
            {feedback.answerfour} 
            </li>
            </div>
            </div>
            </div>

            <div className="mt-2">
            <div  className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">
            <div>
            {feedback.questionfour}         
            </div>
            <div className="py-1">
            <li>
            {feedback.answerfour} 
            </li>
            </div>
            </div>
            </div>
            </div>
          <div className="mt-2">
          <label>Üzenet</label>
          <div className="shadow-md px-3 py-2 border mt-1 border-slate-300 rounded-xl">
            {feedback.message}
          </div>
          </div>
        </div>
        </div>
      )}
    </section>
  );
}
