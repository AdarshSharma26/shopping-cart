import '../styles/home.scss'

const onExploreClick = (event) => {
    window.location.href = `products.html?category=${event.target.value}`;
}

const loadData = async () => {
    try {
        
        const res = await fetch("http://localhost:3000/categories");

        const json = await res.json();

        const categories = document.getElementById("categories")

        for (let i = 0; i < json.length; i++) {
            const element = json[i];
            const div = document.createElement("div");

            div.className = "categories__item";

            div.innerHTML = `
                <div>
                    <img src="${element.imageUrl}" alt="fruits">
                </div>
                <div>
                    <h1>${element.name}</h1>
                    <p>${element.description}</p>
                    <button type="button" class="btn" value="${element.id}">Explore ${element.name}</button>
                `

                categories.appendChild(div);
            
        }

        const btns = document.getElementsByClassName("btn");

        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            btn.addEventListener("click", onExploreClick, false)
        }

    } catch (error) {
        
    }
}

const loadCarouselData = async(index) => {
    try {
        const resCarousal = await fetch("http://localhost:3000/banners");
        const jsonCarousel = await resCarousal.json();

        let currenIndex = index;
        if(index < 0){
            currenIndex = jsonCarousel.length - 1;
            carouselImageIndex = jsonCarousel.length - 1;
        }

        if(index >= jsonCarousel.length){
            currenIndex = 0;
            carouselImageIndex = 0;
        }

        if(currenIndex > -1 && currenIndex < jsonCarousel.length){
            const banners = document.getElementById("banners");
            const existingCarousel = document.querySelectorAll(".carousel__container");
            if(existingCarousel){
                existingCarousel.forEach(carousel => {
                    carousel.remove();
                })
            }
            const element = jsonCarousel[currenIndex];
            const div = document.createElement('div');
            div.innerHTML = `
                <a class="prev" href="#">&#10094;</a>
                    <img src="${element.bannerImageUrl}" alt="${element.description}">            
                <a class="next" href="#">&#10095;</a>
            `
            div.className = "carousel__container";
            banners.appendChild(div);

        const prevBtn = document.getElementsByClassName("prev");
        prevBtn[0].addEventListener("click", prevImg);    

        const nextBtn = document.getElementsByClassName("next");
        nextBtn[0].addEventListener("click", nextImg);   
        }

    } catch (error) {
        
    }
}

loadData();

var carouselImageIndex = 0;

loadCarouselData(carouselImageIndex);

const prevImg = () => {
    carouselImageIndex = carouselImageIndex - 1;
    loadCarouselData(carouselImageIndex);
}

const nextImg = () => {
    carouselImageIndex = carouselImageIndex + 1;
    loadCarouselData(carouselImageIndex);
}