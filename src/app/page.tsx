"use client"

import React from "react";
import Axios from "axios";

import DatePicker from "@/components/ui/datePicker";
import LinesChart from "@/components/ui/lineChart";
import AreaChart from "@/components/ui/areaChart";
import Barcharts from "@/components/ui/barChart";
import Ratings from "@/components/ui/starRating";
import Pichart from "@/components/ui/pieChart";

import { CircleX, Heart } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  const [dobState, setDobState] = React.useState<Date>();
  let [commentState, setCommentState] = React.useState("");
  let [ratingState, setRatingState] = React.useState(1);

  async function handleForm(e: any) {
    e.preventDefault();

    if (ratingState == null || dobState == null)
      return toast.error("Some data wasn't provided.")

    let req_promise = Axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/form', {
      comment: commentState,
      dob: dobState,
      rating: ratingState
    });

    toast.promise(req_promise, {
      loading: 'Loading...',
      success: `Your response has been stored successfully.`,
      error: 'An internal error occurred.',

    })
  }

  return (
    <>

      <nav className="navbar">
        <Link href={'https://github.com/fem-rs'} className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mt-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          Ian Fogarty
        </Link>
        <p>Leaving Cert Project</p>
      </nav>
      <div className="contain">
        <div className="grids content-center align-center justify-center flex">
          <div className="content-form">
            <h1 className="form-title">Meow</h1>
            <p className="form-desc">
              Meow meow meow
            </p>
            <div className="form-inputs">
              <div className="flex justify-left text-gray-400 pb-1">
                Please provide feedback on the data.
              </div>
              <input
                type="text"
                className="inputs"
                placeholder="Feedback (Optional)"
                onChange={(e) => { e.preventDefault(); setCommentState(e.target.value) }}
                value={commentState}
              />
              <div className="flex justify-left text-gray-400 pt-2 pb-1">
                Please provide your date of birth.
              </div>
              <DatePicker state={dobState} setState={setDobState} />
            </div>
            <div className="flex justify-center text-gray-400">
              How would you rate this data?
            </div>
            <div className="flex justify-center">
              <Ratings value={ratingState} handlevaluechange={(e: any) => { setRatingState(e) }} icon={<Heart />} asinput="true" />
            </div>
            <hr className="divider" />
            <div className="form-buttons">
              <button className="secondary-button" onClick={(e) => handleForm(e)}>Submit</button>
            </div>
          </div>

          <Pichart />
          <LinesChart />
          <Barcharts />
          {/* <div>Matrix goes here</div> */}
          <AreaChart />
        </div>
      </div>
    </>
  );
}
