function api(val){
    const Api_url_Pokemon = `https://pokeapi.co/api/v2/pokemon/${val}`,
        Api_url_species = `https://pokeapi.co/api/v2/pokemon-species/${val}`;

    const $template = document.getElementById("crud-template").content,
        $fragment = document.createDocumentFragment(),
        $content = document.querySelector(".cnt-cards");

    //Añadir targetas en main
    const addElmentsCard = ()=>{
        const $progress = document.createElement("progress");
        ajax(Api_url_Pokemon)
        .then(json =>{
            let url_img = json.sprites.other["official-artwork"].front_shiny,
            name = json.name,       //Nombre
            height = json.height;   //Peso
            stats = json.stats;     //Estadisticas
            acm = "";               //Acomulador de stats del json
            acm2 = "";

            $progress.value = 0;    //Establecer el valor minimo
            $progress.max = 100;    //Establecer el valor maximo

            //console.log(json);
            $template.querySelector("img").setAttribute("src",url_img);
            //Recorre las estadisticas del pokemon
            
            stats.forEach(el => {
                const $progressClone = $progress.cloneNode(true); // Clonar el elemento de progreso
                $progressClone.value = el.base_stat;
                  acm += `<p>${el.stat.name}</p>`;
                  acm2 += `<p>${$progressClone.outerHTML}</p>`
            });

            //add
            $template.querySelector("h2").textContent = name;
            $template.querySelector("figcaption").innerHTML = `
            <p>nombre : ${name}</p>
            <p>height : ${height}</p>
            <article class="cnt-stats">
                <div>${acm}</div>
                <div>${acm2}</div>
            </article>`;

            //style css
            $template.querySelector("figure").classList.add("card");
            $template.querySelector("img").classList.add("imgCard");
            $template.querySelector("figcaption").classList.add("figcCard");

            //Colocar habilidades
            let $clone = document.importNode($template,true);
            $fragment.appendChild($clone);
            $content.appendChild($fragment);
        });  
    }

    //Pintar las targetas de colores
    const colorCard = ()=>{      
        ajax(Api_url_species)
        .then(json =>{
            const url_color = json.color.name;
            $template.querySelector("figure").style.backgroundColor = `${url_color}`;
            //console.log(url_color);
        });
    }

    //--MAIN--
    addElmentsCard();
    colorCard();
}

//Peticiones Fetch
const ajax = async (url) => {
    return fetch(url)
    .then(res=>{ if(res.ok){ return res.json(); } else { Promise.reject() } })
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    })
  };

//Filtra las tarjetas por busqueda
const filterCard = ()=>{
    const $cntCards = document.querySelector(".cnt-cards"),
        $input = document.getElementById("search");

    let r,cards;
    $input.addEventListener("keydown", (e)=>{
        cards = e.target = $cntCards;
        r = Array.from(cards.children);
            r.forEach(el =>{
                const $h2elmnt = el.querySelector("h2");
                //console.log($h2elmnt.textContent);    
                $h2elmnt.textContent.includes(e.target.value.toLocaleLowerCase())
                ?  el.classList.remove("filterCard")
                : el.classList.add("filterCard")
            });
            console.log(e.target.value);
    });

}

//Numero de targetas ha imprimir
const showNamePoke = ()=>{
    for(let i=1;i<40+1;i++){
        api(i);
    }
};

showNamePoke();
filterCard();