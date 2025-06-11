class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    console.log("Initial queryObj: ", queryObj);
    const excludedFields = ["page", "sort", "limit", "feilds"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log("After excluding: ", queryObj);
    let queryStr = JSON.stringify(queryObj);
    console.log("After Stingify: ", queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log("With Operators: ", queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

module.exports = APIFeatures;
