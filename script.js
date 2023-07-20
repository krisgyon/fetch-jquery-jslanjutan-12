// function movieDb() {
//   $.ajax({
//     url: `http://www.omdbapi.com/?apikey=bba7d0dd&s=` + $(".inputKey").val(),
//     success: (movies) => {
//       if (movies.Response == "True") {
//         const movie = movies.Search;
//         let cards = "";
//         movie.forEach((m) => {
//           cards += card(m);
//           $(".cards").html(cards);
//           $(".detail").on("click", function () {
//             $.ajax({
//               url: `http://www.omdbapi.com/?apikey=bba7d0dd&i=` + $(this).data("imdbid"),
//               success: (m) => {
//                 const details = detail(m);
//                 $(".modal-body").html(details);
//               },
//               error: (e) => console.log(e.responseText),
//             });
//           });
//         });
//       } else {
//         $(".cards").html(
//           `
//             <div class="">
//               <div class="col-md-4">
//                   <h1 class="text-center">Movie not found!</h1>
//                 </div>
//             </div>
//           `
//         );
//       }
//       $(".inputKey").val("");
//     },
//     error: (e) => e.responseText,
//   });
// }

// $(".kirim").on("click", function () {
//   $(".inputKey").focus();
//   $(".inputKey").on("keyup", function (e) {
//     if (e.which == 13) {
//       movieDb();
//     }
//   });
// });

// function detail(m) {
//   return `<div class="container-fluid">
//                 <div class="row">
//                     <div class="col-md-4">
//                         <img class="img-fluid" src="${m.Poster}" alt="" />
//                     </div>
//                     <div class="col-md">
//                         <div class="card">
//                             <ul class="list-group list-group-flush">
//                                 <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
//                                 <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
//                                 <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
//                                 <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
//                                 <li class="list-group-item">
//                                 <strong>Plot:</strong><br />
//                                 ${m.Plot}
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
// }
const btnSearch = document.querySelector(".kirim");
const inputKey = document.querySelector(".inputKey");
const showDetail = document.querySelector(".showDetail");
const cards = document.querySelector(".cards");

function kartu(m) {
  return `<div class="col-md-4 mb-3">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary detail" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdbid="${m.imdbID}">Detail</a>
                </div>
            </div>
          `
        );
      }
      $(".inputKey").val("");
    },
    error: (e) => e.responseText,
  });
}

$(".kirim").on("click", function () {
  $(".inputKey").focus();
  $(".inputKey").on("keyup", function (e) {
    if (e.which == 13) {
      movieDb();
    }
  });
});

// event binding Modal Show Detail
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("detail")) {
    const imdbid = event.target.dataset.imdbid;
    const details = await getShowDetail(imdbid);
    uiDetail(details);
  }
});

function getShowDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=bba7d0dd&i=" + imdbid)
    .then((details) => details.json())
    .then((details) => details);
}

function uiDetail(m) {
  const cardDetails = kartuDetail(m);

  const showDetail = document.querySelector(".showDetail");
  showDetail.innerHTML = cardDetails;
}

function kartuDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-fluid" src="${m.Poster}" alt="" />
                    </div>
                    <div class="col-md">
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
                                <li class="list-group-item"><strong>Writer:'kb'/strong> ${m.Writer}</li>
                                <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
                                <li class="list-group-item">
                                <strong>Plot:</strong><br />
                                ${m.Plot}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`;
}

btnSearch.addEventListener("click", function () {
  inputKey.focus();
  fetch("http://www.omdbapi.com/?apikey=bba7d0dd&s=" + inputKey.value)
    .then((movies) => movies.json())
    .then((movies) => {
      const movie = movies.Search;
      let card = "";
      movie.forEach((m) => (card += kartu(m)));
      cards.innerHTML = card;

      const btnDetail = document.querySelectorAll(".detail");
      btnDetail.forEach((btn) => {
        btn.addEventListener("click", function () {
          fetch(`http://www.omdbapi.com/?apikey=bba7d0dd&i= ${this.dataset.imdbid}`)
            .then((showDetail) => showDetail.json())
            .then((m) => (showDetail.innerHTML = detail(m)))
            .catch((e) => e.responseTEXT);
        });
      });
    })
    .catch((e) => e.responseTEXT);
});
