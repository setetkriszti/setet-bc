"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import { timeDate } from "src/libs/timedate";
import Link from "next/link";

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState("");
  const { loading, data:profile } = useProfile();

  useEffect(() => {
    fetch("/api/feedbacks").then((res) => {
      res.json().then((feedbacks) => {
        setFeedbacks(feedbacks.reverse());
      });
    });
  }, []);

  if (loading) {
    return "Betöltés...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={profile.admin} className="max-w-2xl mx-auto" />
      <div className="mt-8 max-w-2xl mx-auto">
        {feedbacks?.length > 0 &&
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="md:flex bg-gray-200 mb-2 rounded-lg p-2">
              <div className="flex gap-4 items-center grow">
                <div className="flex gap-8">
                  <div>{feedback.email}</div>
                  <div className="text-gray-500">{timeDate(feedback.createdAt)}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="justify-end flex gap-2 items-center">
                <Link href={"/feedbacks/" + feedback._id} className="button">
                  Több..
                </Link>
              </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
