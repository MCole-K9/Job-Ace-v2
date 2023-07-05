<script lang="ts">
 
  import { Toast, Carousel, Banner, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Button, Heading, P  } from "flowbite-svelte";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    let bannerStyle = "bg-secondary1 w-full justify-center text-primary flex";

</script>
<Header/>

<Toast position="top-right">
  <svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
  Hi Team Welcome
</Toast>
<Banner class ={bannerStyle}>Welcome to the Job Ace Website!</Banner>

<main class=" h-80">
  <!-- 
    Input a Carousel NEEDS TO HAVE IMAGES 
      <Carousel {images}/>
  -->

  <div class="text-secondary2 w-full h-64 ">
    <Heading class="uppercase text-transparent font-bold text-center text-6xl bg-clip-text bg-gradient-to-b from-secondary2 to-blue-200 drop-shadow-lg p-4">Job Ace</Heading>
        <div class="grid grid-cols-3 gap-4 place-content-center">
          <img src="" alt="person here" class="content-center">
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat labore tempora repudiandae ab nihil rerum quos amet, unde dolore hic voluptatem obcaecati quis quod fuga! Excepturi id illum sed!</p>
            <Button class="bg-accent text-primary p-4">Learn More</Button>
          </div>
          <img src="" alt="person here" class="place-content-center">
       
        </div>
          
  </div>

</main>
<Footer/>


