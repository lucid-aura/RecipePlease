let navBar = document.getElementById("navBar")

        function togglebtn(){
            navBar.classList.toggle("hidemenu");
        }


// js for Product gallery

let productImg = document.getElementById("productImg")
        let smallImg = document.getElementsByClassName("smallImg")

        smallImg[0].onclick = function()
        {
            productImg.src = smallImg[0].src;
        }

        smallImg[1].onclick = function()
        {
            productImg.src = smallImg[1].src;
        }

        smallImg[2].onclick = function()
        {
            productImg.src = smallImg[2].src;
        }

        smallImg[3].onclick = function()
        {
            productImg.src = smallImg[3].src;
        }
