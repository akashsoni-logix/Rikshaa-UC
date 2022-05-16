import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";

import "../../css/progress.css";
export default function CountDownTimer(props) {
  const {
    variant,
    timeExtended,
    orderPreapared,
    defaultTime,
    extendedTime,
    order_accepted_at,
    order_prepared_at,
  } = props;

  let min = timeExtended ? extendedTime + defaultTime : defaultTime;

  const BorderLinearProgress = withStyles(() => ({
    bar: {
      borderRadius: 5,
      backgroundColor: timeExtended
        ? `#fc8019`
        : orderPreapared
        ? `#60b246`
        : `#007aff`,
    },
  }))(LinearProgress);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  let passedTimeInSec;

  useEffect(
    () => {
      const totalTimeInSec = min * 60;

      const orderCompletedTimeInSec =
        (new Date(order_prepared_at).getTime() -
          new Date(order_accepted_at).getTime()) /
        1000;

      const timer = setInterval(() => {
        passedTimeInSec =
          (new Date(moment().format("YYYY-MM-DD HH:mm:ss")).getTime() -
            new Date(order_accepted_at).getTime()) /
          1000;

        const remaining = (defaultTime + extendedTime) * 60 - passedTimeInSec;
        if (!order_accepted_at && !defaultTime) {
          setRemainingTime("00:00");
        }
        if (orderPreapared) {
          // setProgress(() => (passedTimeInSec * 100) / totalTimeInSec);
          setProgress(() => (orderCompletedTimeInSec * 100) / totalTimeInSec);

          setRemainingTime(fmtMSS(totalTimeInSec - orderCompletedTimeInSec));
          if (passedTimeInSec >= totalTimeInSec) {
            // setProgress(100);
            // setRemainingTime("00:00");
          }
          cleanup();
        } else if (
          !orderPreapared &&
          !timeExtended &&
          totalTimeInSec !== 0 &&
          passedTimeInSec >= totalTimeInSec
        ) {
          setProgress(100);
          setRemainingTime("00:00");
        } else if (timeExtended && !orderPreapared) {
          setProgress(100);
          setRemainingTime("00:00");
        } else if (remaining >= 0) {
          setProgress(() => (passedTimeInSec * 100) / totalTimeInSec);
          setRemainingTime(fmtMSS(remaining));
        } else {
          cleanup();
        }
      }, 1000);

      const cleanup = () => {
        return clearInterval(timer);
      };
    },
    [defaultTime, orderPreapared, timeExtended]
  );

  function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  return (
    <div className={classes.root}>
      <div>
        {variant === "progressBar" && (
          <div style={{ paddingBottom: "18px" }}>
            <div
              style={{
                padding: "0 18px",
                color: "#76b33e",
                fontWeight: "600",
                textDecoration: timeExtended ? "line-through" : "",
              }}
            >
              {defaultTime} Minutes{" "}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                padding: "0px 20px",
                margin: "2px 0",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className={
                  "progress-wrp" + (timeExtended ? " remaining-progress" : "")
                }
                style={{
                  width: "100%",
                }}
              >
                <BorderLinearProgress
                  variant="determinate"
                  value={progress}
                  style={{
                    height: "14px",
                    width: "256px",
                    borderRadius: "5px",
                    background: "#e8ecef",
                  }}
                />
              </div>
              <div
                style={{
                  width: "10%",
                  color: "#424242",
                  fontWeight: "500",
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {" "}
                {("0" + remainingTime.split(":")[0]).slice(-2)}:
                {remainingTime.split(":")[1]}
              </div>
            </div>
            <div
              style={{
                padding: "0 18px",
              }}
            >
              <h3
                style={{
                  color: "#ea4335",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                {timeExtended ? (
                  <span> {extendedTime} Minutes extended.</span>
                ) : (
                  <span />
                )}
              </h3>
              <h3
                style={{
                  color: "#424242",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                {orderPreapared && !timeExtended && (
                  <span>
                    Wow! Your order is ready before scheduled time! 🥳🎊
                  </span>
                )}
                {timeExtended && orderPreapared && (
                  <span>Your order is ready! 🥳🎊</span>
                )}
              </h3>
            </div>
          </div>
        )}
        {variant === "countDownBox" && (
          <>
            <div
              style={{
                marginTop: "25px",
                Width: "100%",
                fontSize: "50px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <span
                style={{
                  background: timeExtended ? "#f44336" : "#222b45",
                  borderRadius: "4px",
                  padding: "5px 10px 0px 10px",
                  margin: "0 4px",
                  display: "inline-block",
                  lineHeight: "66px",
                  height: "80px",
                  width: "80px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {("0" + remainingTime.split(":")[0]).slice(-2)}
              </span>
              <span className="timer-separator">:</span>
              <span
                style={{
                  background: timeExtended ? "#f44336" : "#222b45",
                  borderRadius: "4px",
                  padding: "5px 10px 0px 10px",
                  margin: "0 4px",
                  display: "inline-block",
                  lineHeight: "66px",
                  height: "80px",
                  width: "80px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {remainingTime.split(":")[1]}
              </span>
            </div>
            <h3
              style={{
                color: "#fff",
                textAlign: "center",
                margin: "0",
                paddingTop: "10px",
                fontSize: "20px",
              }}
            >
              {timeExtended ? (
                <h4
                  style={{
                    color: timeExtended ? "#f44336" : "#fff",
                    textAlign: "center",
                    margin: "0",
                    paddingTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {extendedTime} Minutes extended.
                </h4>
              ) : (
                <h2 />
              )}
            </h3>
            <h3
              style={{
                textAlign: "center",
                margin: "0",
                paddingTop: "10px",
                fontSize: "20px",
              }}
            >
              {orderPreapared && (
                <h4
                  style={{
                    color: timeExtended ? "red" : "white",
                    textAlign: "center",
                    margin: "0",
                    paddingTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {!timeExtended && (
                    <span>
                      Wow! Your order is ready before scheduled time! 🥳🎊
                    </span>
                  )}
                  {timeExtended && <span>Your order is ready! 🥳🎊</span>}
                </h4>
              )}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
