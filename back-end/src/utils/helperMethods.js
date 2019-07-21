//Constructs Date into a Readable String Format
export const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`
    return str
}


//Refractor Order to the format that the Email sender requires
export const refractorOrder = (myOrder) => {

    const refractoredOrder = {

        firstName: myOrder.firstName,
        lastName: myOrder.lastName,
        email: myOrder.email,
        country: myOrder.country,
        checkIn: myOrder.dateFrom,
        checkOut: myOrder.dateTo,
        breakfast: myOrder.breakfast,
        lunch: myOrder.lunch,
        dinner: myOrder.dinner,
        numberMales: parseInt(myOrder.males, 10),
        numberFemales: parseInt(myOrder.females, 10),
        numberVans: parseInt(myOrder.van, 10),
        numberCars: parseInt(myOrder.cars, 10),
        numberBikes: parseInt(myOrder.motorbikes, 10),

        transactionID: myOrder.uuid
    }

    return refractoredOrder
}