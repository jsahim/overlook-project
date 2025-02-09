class Customer {
  constructor(userObj){
    this.id = userObj.id
    this.name = userObj.name
    this.username = `customer${this.id}`
    this.password = "overlook2021"
    this.allBookings = null
    this.totalSpend = 0
  }
  getFirstName(){
    return this.name.split(" ")[0]
  }
  getTotalSpent(roomsArray){
    this.totalSpend = this.allBookings.reduce((sum, bookObj) => {
      let foundRoom = roomsArray.find(room => room.number === bookObj.roomNumber)
      sum += foundRoom.costPerNight
      return sum
    }, 0).toFixed(2)
    return this.totalSpend
  }
  getPointsEarned(){
    return Math.round((+(this.totalSpend))) * 2
  }
  getMemberLevel(){
    if(this.totalSpend <= 7000){
      return "Silver Member"
    } else if (this.totalSpend > 7000 && this.totalSpend < 10000){
      return "Gold Member"
    } else {
      return "Platinum Member"
    }
  }
  sortBookings(){
    let today = new Date().toISOString().split('T')[0].replaceAll("-" ,"/")
    let bookingObj = this.allBookings.reduce((acc, bookObj) => {
      if(bookObj.date >= today){
        acc.futureStays.push(bookObj)
      } else {
        acc.pastStays.push(bookObj)
      }
      return acc
    }, { pastStays: [], futureStays: [] })
    let pastArray, futureArray
    pastArray = bookingObj.pastStays
    .sort(function(a, b) {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return d-c;
    });
    futureArray = bookingObj.futureStays
    .sort(function(a, b) {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return d-c;
    });
    bookingObj.pastStays = pastArray
    bookingObj.futureStays = futureArray
    return bookingObj
  }
}

export default Customer