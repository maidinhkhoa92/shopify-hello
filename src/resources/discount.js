const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
const shopRequestHeaders = {
  'X-Shopify-Access-Token': accessToken,
};

request.get(shopRequestUrl, { headers: shopRequestHeaders })
.then((shopResponse) => {
  res.status(200).end(shopResponse);
})
.catch((error) => {
  res.status(error.statusCode).send(error.error.error_description);
});
