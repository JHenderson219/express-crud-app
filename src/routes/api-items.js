var express = require('express');
var router = express.Router();
var startData = require('./../data.json');

router.get('/', function (req, res) {
  res.json(startData);
});

router.get('/:id', function (req, res) {
  var requestedId = req.params.id;
  var requestedItem;

  startData.map(function (item) {
    if (item.id === requestedId) {
      requestedItem = item;
    }
    return item;
  });

  // if item id is not found, let the user know
  if (requestedItem === undefined) {
    requestedItem = {
      success: false,
      message: 'item not found'
    }
  }
  res.json(requestedItem);
});

router.post('/add', function (req, res) {
  var newItem = {
    content: req.body.content,
    id: Date.now(),
    isComplete: false,
  }

  startData.push(newItem);
  var responseObject = {
    success: true,
    item: newItem,
  }
  res.json(responseObject);
});

router.put('/update/:id', function (req, res) {
  var updatedItem = {
    content: req.body.content,
    isComplete: req.body.isComplete,
    id: req.params.id,
  }
  var foundItem = false;
  startData = startData.map(function (item) {
    if (item.id === updatedItem.id) {
      foundItem = true;
      item = updatedItem;
    }
    return item;
  });

  if(foundItem) {
    res.json({
      success: true,
      item: updatedItem,
    });
  } else {
    res.json({
      success: false,
      message: 'item not found'
    });
  }
});

router.delete('/delete/:id', function (req, res) {
  var itemFound = false;
  var itemIndex;

  startData.map(function (item, index) {
    if (item.id === req.params.id) {
      itemFound = true;
      itemIndex = index;
    }
    return item;
  });

  startData.splice(itemIndex, 1);

  if(itemFound) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: 'item not found'
    })
  }
});

module.exports = router;