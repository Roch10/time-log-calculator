import React, { useEffect, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import moment from "moment";

import TimeSelector from "../components/timeSelectot";
import { TimeLog } from "../models/TimeLog";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
  const [timeLogList, setTimeLogList] = useState<Array<TimeLog>>([]);
  const [totals, setTotals] = useState({
    totalBreaks: 0,
    totalHours: 0,
    totalWorkedHours: 0,
  });
  const [timeLog, setTimeLog] = useState<TimeLog>({
    name: "",
    sHr: "",
    sMin: "",
    sAA: "AM",
    eHr: "",
    eMin: "",
    eAA: "PM",
    date: moment(new Date()).format("YYYY-MM-DD"),
    breaks: [NEW_TIME_LOG],
  });

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

  const getTotalLog = (arr: Array<any>, prop: string) => {
    let total = 0;
    if (arr.length) {
      arr.forEach((item) => {
        total += item[prop];
      });
    }
    return +total.toFixed(2);
  };

  const deleteTimeLog = (i: number) => {
    let a = timeLogList;
    a.splice(i, 1);
    setTimeLogList(a);
  };

  useEffect(() => {
    if (timeLogList.length)
      setTotals({
        totalBreaks: getTotalLog([...timeLogList], "totalBreaks"),
        totalHours: getTotalLog([...timeLogList], "totalHours"),
        totalWorkedHours: getTotalLog([...timeLogList], "totalWorkedHours"),
      });
  }, [timeLogList]);

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
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type={"date"}
              className="form-control"
              id="date"
              value={timeLog.date}
              onChange={(e) => setTimeLog({ ...timeLog, date: e.target.value })}
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
              let totalHours = getDifference(timeLog);
              let breaks = timeLog.breaks?.map((b) => {
                console.log("breaks", getDifference(b));
                return getDifference(b);
              });

              let totalBreaks =
                breaks?.reduce((prev, curr) => prev + curr) || 0;

              let totalWorkedHours = totalHours - totalBreaks;

              setTimeLogList([
                ...timeLogList,
                {
                  ...timeLog,
                  totalHours: +totalHours.toFixed(2),
                  totalBreaks: +totalBreaks.toFixed(2),
                  totalWorkedHours: +totalWorkedHours.toFixed(2),
                },
              ]);
            }}
          >
            Calculate & Add
          </button>

          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Total Hours</th>
                <th scope="col">Total Break</th>
                <th scope="col">Total Worked Hours</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {timeLogList.map((log, i) => {
                return (
                  <tr key={i}>
                    <td scope="row">{log.date}</td>
                    <td>{log.totalHours || 0}</td>
                    <td>{log.totalBreaks || 0}</td>
                    <td>{log.totalWorkedHours || 0}</td>
                    <td>
                      <FaTrash
                        className="ms-2 text-danger"
                        onClick={() => deleteTimeLog(i)}
                      />
                    </td>
                  </tr>
                );
              })}

              <tr>
                <th scope="row">Totals</th>
                <th>{totals.totalHours}</th>
                <th>{totals.totalBreaks}</th>
                <th>{totals.totalWorkedHours}</th>
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
              newData.push({
                name: timeLogList[0].name,
                logs: timeLogList,
                ...totals,
              });
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
