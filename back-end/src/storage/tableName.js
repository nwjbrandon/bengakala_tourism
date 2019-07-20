// note that this database design is terrible
export const TABLE_ADMINISTRATOR = 'ADMINISTRATOR';
export const TABLE_INFORMATION = 'INFORMATION';
export const TABLE_TRANSACTIONS = 'TRANSACTIONS';
export const TABLE_EXCLUDED_DATES = 'EXCLUDED_DATES';
/*
 * Data: Transactions
 * Table Name: TRANSACTIONS
 * uuid: string - mid trans id
 * firstName: string - first name
 * lastName: string - last name
 * email: string - email
 * country: string - country
 * dateFrom: datetime  - starting of visit
 * dateTo: datetime - end of visit
 * breakfast: boolean - select breakfast
 * lunch: boolean - select breakfast
 * dinner: boolean - select breakfast
 * males: string - number of males
 * females: string - number of females
 * cars: boolean - select cars
 * van: boolean - select van
 * motorbikes: boolean - select motorbikes
 * createdAt: timestamp - entry created
 * checkedIn: boolean - visitor came
 * cash: boolean - choice of payment
 */

/*
 * Data: Administrators
 * Table Name: ADMINISTRATOR
 * uuid: entry id
 * username: email address
 * email: email address
 * password: hash of the password
 * phone: contact number
 * jobTitle job title
 * createdAt: time of account creation
 * edit: is root admin
 */

/*
 * Data: Excluded dates
 * Table Name: EXCLUDED_DATES
 * uuid: string - entry id
 * date: datetime - date to exclude
 * value: string - always -1
 * createdAt: timestamp - entry created
 */

/*
 * Data: Cost
 * Table Name: INFORMATION
 * uuid: string - entry id
 * title: string - item name
 * pricesString: string - item cost
 * type: string - entry type
 * edit: boolean - always 0
 * createdAt: timestamp - entry created
 */

/*
 * Data: Accommodation Pictures
 * Table Name: INFORMATION
 * uuid: string - entry id
 * title: string - accommodation description
 * imgUrl: string - image links
 * type: string - entry type
 * edit: boolean - always 0
 * createdAt: timestamp - entry created
 */

/*
 * Data: Contact Details
 * Table Name: INFORMATION
 * uuid: string - entry id
 * title: string - title of the detail
 * text: string - information of the detail
 * type: string - entry type
 * edit: boolean - always 0
 * createdAt: timestamp - entry created
 */

// My computer battery died, so I gave up commenting. But it is quite obvious honestly.
