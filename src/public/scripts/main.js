(function($){
  var $list = $('.list');
  var $inputField = $('#item-form__content');

  $('#item-form').submit(function(e) {
    e.preventDefault();

    var $newContent = $inputField;
    var newContent = $newContent.val();

    if ($newContent.val() !== '') {  
      addItem($newContent.val());
    }
  });
  /*
    Adding an item 
    - Called in form submission
    - Sends content to server 
  */
  function addItem(newContent, cb) {
    $.post('http://localhost:8000/api/items/add/', { content: newContent }, function(response) {
      if (response.success) {

        addItemToList(response.item);
        $inputField.val('');
      } 
    });
  }
  function addItemToList(item) {
    var list__item__SOURCE = $('#template__list-item').html();
    var template = Handlebars.compile(list__item__SOURCE);

    var newItem = template(item);

    $list.append(newItem) // add item to list
      .find('#list__item-' + item.id) // find the dom node
      .on('click', deleteItem); // add on delete click event
  }

  // Adding Delete button event listener when the page loads
  $('.settings-widget__delete').on('click', deleteItem);

  function deleteItem() {
    var id = $(this).parent().attr('data-id');
    if (confirm('Are you sure you want to delete?')) {
      deleteItemAjax(id, function(response) {
        if (response.success) {
          $('#list__item-' + id).remove();
        }
      });
    }
  }

  function deleteItemAjax(id, cb) {
    $.ajax({
      url: 'http://localhost:8000/api/items/delete/' + id,
      type: 'DELETE',
      success: function(response) {
        cb(response);
      }
    });
  }

  // $('.settings-widget__edit').on('click', editItem);

  // function editItem() {
  //   var id = $(this).parent().attr('data-id');

  //   editItemAjax(id, function (response) {
  //     if (response.success) {
  //       updateItem(response.item);
  //     }
  //   });
  // }

  // function updateItemView (updatedItem) {
  //   var $item = $('#list__item-' + updatedItem.id);

  //   $item.find('.list__item__content').text(updatedItem.content);
  // }

  // function editItemAjax(id, cb) {
  //   $.ajax({
  //     url: 'http://localhost:8000/api/items/update' + id,
  //     type: 'PUT',
  //     success: function(response) {
  //       cb(response);
  //     }
  //   })
  // }






  


}(jQuery));