function search(event) {
  event.preventDefault(); // form submissionunu önler
  var searchTerm = $("#search-input").val(); // kullanıcının girdiği kelimeyi alır
  $.ajax({
    url: "/search.json", // veri kaynağı dosyasının yolu
    dataType: "json",
    success: function(data) {
      var filteredData = data.filter(function(item) {
        // burada filtreleme işlemi gerçekleştirilir
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      var topResults = filteredData.slice(0, 3); // en yakın 3 sonucu alır
      var resultList = $("<ul>"); // sonuçları liste olarak görüntüler
      topResults.forEach(function(result) {
        resultList.append($("<li>").text(result.title)); // örneğin sadece başlıkları listeleriz
      });
      $(".search-results").html(resultList); // sonuçları navbar'ın altında görüntüler
    }
  });
}

$("#search-form").on("submit", search); // form submit edildiğinde search fonksiyonunu çağırır
