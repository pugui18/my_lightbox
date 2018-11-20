
// al hacer clic en una imagen se abra su version grande
var getImages  = container => [...container.querySelectorAll('img')];

var getLargeImages = gallery => gallery.map(el => el.src)

var getDescriptions = gallery => gallery.map(el => el.alt);


var openLightBoxEvent = (container ,  gallery , larges , descriptions) => {
    container.addEventListener('click' , e =>{
        var el = e.target,
        i = gallery.indexOf(el);

       if(el.tagName === 'IMG'){
            openLightBox(gallery , i , larges , descriptions); //end if
       }
        })
}

var openLightBox = (gallery , i , larges , descriptions)=> {
    //abrir el lighbox al pulsar 
    var lightBoxElement = document.createElement('div');
        lightBoxElement.innerHTML =  `
        <div class="lightbox-over">
            <figure class="lightbox-container">
            <div class="close-modal"> X </div>
                <img src="${larges[i]}" class="lightbox-image">
                    <figcaption>
                        <p class="lightbox-description">
                            ${descriptions[i]}
                        </p>
                        <nav class="ligthbox-navigation">
                            <a href="#" class="lightbox-navigation_button prev">Atras</a>
                            <span class="ligthbox-navigation_counter"> Imagen ${i+1} de ${gallery.length} </span>
                            <a href="#" class="lightbox-navigation_button next">Adelante</a>
                        </nav>
                    </figcaption>     
            </figure>

        </div>
        
        `;      

   lightBoxElement.id = 'lightbox';
    document.body.appendChild(lightBoxElement);

    
        closeModal(lightBoxElement)
        navigatorLightBox(lightBoxElement, i , larges, descriptions);
}   

var closeModal = modalElement => {
    var closeModal  =  modalElement.querySelector('.close-modal');
    closeModal.addEventListener('click' , e =>{
        e.preventDefault();
        document.body.removeChild(modalElement);
        
    })
}

var navigatorLightBox = (lightBoxElement, i, larges, descriptions)=>{
    var prevButton = lightBoxElement.querySelector('.prev'),
    nextButton = lightBoxElement.querySelector('.next'),
    image = lightBoxElement.querySelector('img'),
    description = lightBoxElement.querySelector('p'),
    counter = lightBoxElement.querySelector('span'),
    closeFrame = lightBoxElement.querySelector('.close-modal')
    
    window.addEventListener('keyup' , e =>{
            if(e.key === 'ArrowRight') nextButton.click();
            if(e.key === 'ArrowLeft') prevButton.click();
            if(e.key === 'Escape') closeFrame.click();
        })  
    
    lightBoxElement.addEventListener('click' , e => {
            e.preventDefault();
            var target = e.target;

            if(target === prevButton){
                if( i > 0 ){    
                    image.src = larges[i-1]
                    i--;
                }else{
                    image.src = larges[larges.length - 1]
                    i = larges.length-1;
                }
            }else if (target === nextButton){

                if(i < larges.length - 1){
                    image.src = larges[i+1];
                    i++
                }else{
                    image.src = larges[0]
                    i=0; 
                }
            }

            description.textContent = descriptions[i];
            counter.textContent = `Imagen ${i+1} de ${larges.length}`;
        })
}


var lightbox = container =>{
    var images = getImages(container),
        larges = getLargeImages(images),
        descriptions =getDescriptions(images);
        openLightBoxEvent(container, images , larges , descriptions ); 
}

lightbox(document.getElementById('gallery-container'));
