import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const users = [
      {
        username: "admin",
        password: "admin",
        firstname: "admin1",
        lastname: "admin2",
        dateofbirth: "10/10/2010",
        emailid: "admin@admin.com",
        city: "admincity",
        country: "admincountry",
      }
    ];

    const cards = [
      {
        cardnumber: 504296232325,
        cardname: "Master Card",
        cardholdername: "Billionare",
        expirydate: "12/10/2026",
      },
      {
        cardnumber: 293429038402,
        cardname: "America Express",
        cardholdername: "Billionare",
        expirydate: "02/05/2030",
      },
      {
        cardnumber: 237462374684,
        cardname: "Visa Card",
        cardholdername: "Billionare",
        expirydate: "27/07/2028",
      },
    ];


    const payments = [
      {
        paymentid: 794002225,
        date: "23/06/2011",
        merchantname: "Shopify Inc",
        amountpaid: 989,
        currencycode: "INR",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 898337591,
        date: "01/06/2012",
        merchantname: "Amazon Inc",
        amountpaid: 9899,
        currencycode: "USD",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 427146135,
        date: "03/01/2014",
        merchantname: "Shopper Topper",
        amountpaid: 55,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 348002398,
        date: "16/02/2015",
        merchantname: "Starbucks",
        amountpaid: 10,
        currencycode: "USD",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 575785674,
        date: "29/07/2015",
        merchantname: "McDonalds",
        amountpaid: 87,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 375632229,
        date: "23/07/2016",
        merchantname: "KFC",
        amountpaid: 7,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 224772728,
        date: "19/12/2016",
        merchantname: "Shopify Inc",
        amountpaid: 2300,
        currencycode: "INR",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 261684100,
        date: "03/01/2017",
        merchantname: "Ebay Inc",
        amountpaid: 2323,
        currencycode: "INR",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 129796633,
        date: "14/02/2017",
        merchantname: "Google Play",
        amountpaid: 230,
        currencycode: "USD",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 592343163,
        date: "27/05/2017",
        merchantname: "Microsoft Corp",
        amountpaid: 283,
        currencycode: "INR",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 858870032,
        date: "12/11/2021",
        merchantname: "Amazon Inc",
        amountpaid: 2323,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 104090592,
        date: "28/01/2022",
        merchantname: "Flacazzo Hotel",
        amountpaid: 3243,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 853650937,
        date: "25/03/2022",
        merchantname: "Lemredian",
        amountpaid: 8273,
        currencycode: "USD",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 707463519,
        date: "26/10/2023",
        merchantname: "Megamart",
        amountpaid: 233,
        currencycode: "INR",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 772623285,
        date: "19/03/2027",
        merchantname: "Recharge.com",
        amountpaid: 398,
        currencycode: "USD",
        deffered: false,
        cardnumber: 504296232325,
      },
      {
        paymentid: 385823994,
        date: "07/07/2027",
        merchantname: "Apple Inc",
        amountpaid: 989,
        currencycode: "INR",
        deffered: false,
        cardnumber: 293429038402,
      },
      {
        paymentid: 935809037,
        date: "02/09/2027",
        merchantname: "Amaxon Inc",
        amountpaid: 2000,
        currencycode: "USD",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 427288338,
        date: "10/07/2028",
        merchantname: "Shopify Inc",
        amountpaid: 500,
        currencycode: "INR",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 386574641,
        date: "01/12/2028",
        merchantname: "Flipkart Ltd",
        amountpaid: 300,
        currencycode: "INR",
        deffered: false,
        cardnumber: 237462374684,
      },
      {
        paymentid: 390247098,
        date: "05/03/2030",
        merchantname: "Walmart",
        amountpaid: 100,
        currencycode: "EUR",
        deffered: false,
        cardnumber: 237462374684,
      }
    ];

    return { cards, payments, users };
  }
}