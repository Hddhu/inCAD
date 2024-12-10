<template>
    <div id="imageContainer">
        <img src="../assets/images/02A.warmtepomp1.svg" alt="svg"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentZoom: 1,
        }
    },
    mounted() {
        const container = document.getElementById('imageContainer'); 
        
        container.addEventListener('wheel', (event) => {
            const direction = event.deltaY > 0 ? -1 : 1;
            this.zoomImage(direction);
        });
    },
    methods: {
        zoomImage(direction) {
            const minZoom = 1;
            const maxZoom = 5;
            const stepSize = 0.1;

            const newZoom = this.currentZoom + direction * stepSize;

            if (newZoom < minZoom || newZoom > maxZoom) {
                return;
            }

            this.currentZoom = newZoom;

            const image = document.querySelector('#imageContainer img');
            image.style.transform = `scale(${this.currentZoom})`;
        },
    }
}
</script>

<style>
#imageContainer { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100%; 
  width: 100%;
  overflow: auto;
  background-color: #f3f4f6;
} 
  
img { 
    max-width: 100%; 
    margin: 20px;
} 
  
#imageContainer img:hover { 
  cursor: zoom-in; 
} 
</style>