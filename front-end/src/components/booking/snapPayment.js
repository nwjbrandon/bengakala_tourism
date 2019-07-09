// callSnap = async () => {
//     await snap.show();
//     console.log('handling token request like a boss')
//     const snapToken = await getToken();
//     console.log("snaptoken", snapToken)
//     if (snapToken) {
//         console.log('calling snap pay')
//         snap.pay(snapToken, {
//             onSuccess: (result) => {
//                 console.log('success'); console.log(result); alert('Payment Success')
//             },
//             onPending: (result) => {
//                 console.log('pending'); console.log(result); alert('Payment Pending')
//             },
//             onError: (result) => { console.log('error'); console.log(result); alert('Payment Error') },
//             onClose: () => {
//                 console.log('customer closed the popup without finishing the payment');
//                 alert('Please do not close the payment pop-up')
//             }
//         })

//     } else {
//         snap.hide();
//         console.log(error)
//     }
// }


// getToken = async () => {
//     const { personalDetails, grossAmount } = this.props
//     console.log('getting token from backend')
//     const res = await API.post('/snap/info', {

//         'first_name': personalDetails.firstName,
//         'last_name': personalDetails.lastName,
//         'email': personalDetails.email,
//         'gross_amount': grossAmount,

//     });

//     console.log("Response", res)
//     if (res) {
//         return res.snapToken;
//     } else {
//         return null;
//     }

// }

// export default callSnap