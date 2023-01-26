import React, { useEffect, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import moment from "moment";

import TimeSelector from "../components/timeSelectot";
import { TimeLog } from "../models/TimeLog";
import { useNavigate } from "react-router-dom";

const NEW_TIME_LOG = {
  sHr: "",
  sMin: "",
  sAA: "AM",
  eHr: "",
  eMin: "",
  eAA: "PM",
};

const AddLog = () => {
  const navigate = useNavigate();
  const [timeLog, setTimeLog] = useState<TimeLog>({
    name: "",
    sHr: "",
    sMin: "",
    sAA: "AM",
    eHr: "",
    eMin: "",
    eAA: "PM",
    breaks: [NEW_TIME_LOG],
  });

  const [totalHours, setTotalHours] = useState(0);
  const [totalBreaks, setTotalBreaks] = useState(0);
  const [totalWorkedHours, setTotalWorkedHours] = useState(0);

  const handleBreaks = (isAdd: boolean) => {
    let newBreakList = timeLog.breaks ? [...timeLog.breaks] : [];
    isAdd ? newBreakList.push(NEW_TIME_LOG) : newBreakList.pop();

    setTimeLog({ ...timeLog, breaks: newBreakList });
  };

  const handleBreakChange = (log: TimeLog, index: number) => {
    let newBreakList = timeLog.breaks
      ? timeLog.breaks.map((b, i) => {
          if (i === index) {
            b = log;
          }
          return b;
        })
      : [];
    setTimeLog({ ...timeLog, breaks: newBreakList });
  };

  const getDifference = (log: TimeLog) => {
    let startDate = moment(
      `01/01/2023 ${log.sHr}:${log.sMin} ${log.sAA}`,
      "MM/DD/YYYY h:m AA"
    );
    let endDate = moment(
      `01/01/2023 ${log.eHr}:${log.eMin} ${log.eAA}`,
      "MM/DD/YYYY h:m AA"
    );
    var duration = moment.duration(endDate.diff(startDate));
    var hours = duration.asHours();

    return +hours.toFixed(2);
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Add Time Log</h1>
        </div>
      </div>

      <div className="row my-5 justify-content-center">
        <form className="col-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              id="name"
              value={timeLog.name}
              onChange={(e) => setTimeLog({ ...timeLog, name: e.target.value })}
            />
          </div>

          <TimeSelector
            {...timeLog}
            onChange={(log: TimeLog) => setTimeLog({ ...timeLog, ...log })}
          />

          <div className="mb-3">
            <div className="row">
              <div className="col">
                <div className="d-flex align-item-center">
                  <p className="m-0">Breaks</p>
                  <IoIosAddCircleOutline
                    className="ms-3 fs-5"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBreaks(true)}
                  />
                  <IoIosRemoveCircleOutline
                    className="ms-2 fs-5"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBreaks(false)}
                  />
                </div>
                {timeLog.breaks?.map((breakTime: TimeLog, index) => {
                  return (
                    <TimeSelector
                      key={index}
                      {...breakTime}
                      onChange={(log: TimeLog) => handleBreakChange(log, index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log("timeLog", timeLog);

              let totalHours = getDifference(timeLog);
              let breaks = timeLog.breaks?.map((b) => {
                console.log("breaks", getDifference(b));
                return getDifference(b);
              });

              let totalBreaks =
                breaks?.reduce((prev, curr) => prev + curr) || 0;

              let totalWorkedHours = totalHours - totalBreaks;

              setTotalHours(totalHours);
              setTotalBreaks(totalBreaks);
              setTotalWorkedHours(totalWorkedHours);
            }}
          >
            Calculate
          </button>

          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Total Hours</th>
                <th scope="col">Total Break</th>
                <th scope="col">Total Worked Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{totalHours}</th>
                <td>{totalBreaks}</td>
                <td>{totalWorkedHours}</td>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              let data = localStorage.getItem("data");
              let newData: Array<any> = [];
              if (data) {
                newData = JSON.parse(data);
              }
              newData.push(timeLog);
              localStorage.setItem("data", JSON.stringify(newData));
              navigate("/");
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLog;
