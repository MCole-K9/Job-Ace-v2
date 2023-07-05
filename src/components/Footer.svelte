<script>
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, FooterBrand, FooterIcon } from 'flowbite-svelte'
  let titleStyle = "self-center whitespace-nowrap text-xl font-semibold";
  let footerStyle = "border-t-4 border-primary drop-shadow-lg bg-gradient-to-t from-secondary1 to-primary text-accent";
</script>

<Footer class={footerStyle} >
  <FooterBrand class="mr-3 h-6 sm:h-9" src="https://fiwibusiness.com/wp-content/uploads/2016/07/HEART-NSTAT-Logo.jpg" alt="Job Ace Logo"/>
  <span class={titleStyle} >JobAce</span>
  <FooterLinkGroup class="text-accent">
    <FooterLink>About Us</FooterLink>
    <FooterLink>Support</FooterLink>
    <FooterLink>Jobs</FooterLink>
  </FooterLinkGroup>
  <!--© 2023 Ace Jobs All Rights Reserved.-->
  <FooterCopyright by="Ace Jobs"/>
</Footer>
