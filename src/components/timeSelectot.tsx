import { TimeLog } from "../models/TimeLog";

type timeSelector = {
  //   id: any;
  sHr: string;
  sMin: string;
  sAA: string;
  eHr: string;
  eMin: string;
  eAA: string;
  onChange: (params: TimeLog) => void;
};

const TimeSelector = ({
  //   id,
  sHr,
  sAA,
  sMin,
  eAA,
  eHr,
  eMin,
  onChange,
}: timeSelector) => {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col">
          <label className="form-label">Start Time</label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                id="shh"
                value={sHr}
                onChange={(e) =>
                  onChange({ sAA, sHr: e.target.value, sMin, eAA, eHr, eMin })
                }
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                id="smm"
                value={sMin}
                onChange={(e) =>
                  onChange({ sAA, sHr, sMin: e.target.value, eAA, eHr, eMin })
                }
              />
            </div>
            <div className="col">
              <select
                name="saa"
                id="saa"
                className="form-select"
                value={sAA || "AM"}
                onChange={(e) =>
                  onChange({ sAA: e.target.value, sHr, sMin, eAA, eHr, eMin })
                }
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col">
          <label className="form-label">End Time</label>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                id="ehh"
                value={eHr}
                onChange={(e) =>
                  onChange({ sAA, sHr, sMin, eAA, eHr: e.target.value, eMin })
                }
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="number"
                id="emm"
                value={eMin}
                onChange={(e) =>
                  onChange({ sAA, sHr, sMin, eAA, eHr, eMin: e.target.value })
                }
              />
            </div>
            <div className="col">
              <select
                name="saa"
                id="eaa"
                className="form-select"
                value={eAA || "PM"}
                onChange={(e) =>
                  onChange({ sAA, sHr, sMin, eAA: e.target.value, eHr, eMin })
                }
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
