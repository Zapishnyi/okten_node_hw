import dayjs, { ManipulateType } from "dayjs";

class TimeHelper {
  public expTimeConverter(value: string): Date {
    const timeValueArr = value.match(/\d*/);
    const timeUnitArr = value.match(/[a-z].*/);
    let resultDate = dayjs().toDate();
    if (timeValueArr && timeUnitArr) {
      const timeUnit = timeUnitArr[0] as ManipulateType;
      resultDate = dayjs().subtract(Number(timeValueArr[0]), timeUnit).toDate();
    } else {
      console.log("Token expiration converted with error");
    }
    return resultDate;
  }
}

export const { expTimeConverter } = new TimeHelper();
