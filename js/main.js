var links = document.querySelectorAll('.nav-link');
var dataList=[];
for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        var clickedRecpie = e.target.text;
        getRecpies(clickedRecpie)
    })
}
getRecpies("pizza")
function getRecpies(meal){
    var http = new XMLHttpRequest();
    http.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    http.send();
    http.addEventListener('readystatechange',function(){
            if(http.readyState === 4 && http.status === 200){
              dataList = JSON.parse(http.response).recipes;
              display();
            }
        })
}

    function display(){
     var cols=``;
    for(var i=0 ; i<dataList.length;i++){
        cols+=`
        <div class="col-md-4">
        <div class="item border rounded shadow text-center pb-5">
        <img src="${dataList[i].image_url}" class="w-100">
        <h2 class="fw-lighter fs-4 py-3">${dataList[i].title}</h2>
        <a href="${dataList[i].source_url}" class="btn btn-danger">source</a>
        </div>
      </div>
        `
        document.getElementById('rowBody').innerHTML = cols;
    }
}