<script>
    import { Navbar, NavBrand, NavLi, NavUl, Input, Button } from 'flowbite-svelte'
    let li = "text-sm font-semibold leading-6 text-accent hover:text-secondary2 cursor-pointer font-bold drop-shadow-lg";
    let inputStyle = "w-80 rounded-md border-accent pe-10 shadow-sm sm:text-sm";
    let buttonStyle = "bg-secondary2 text-primary hover:bg-primary hover:text-secondary2";
    let titleStyle = "self-center whitespace-nowrap text-xl font-semibold text-accent";
    let navStyle = "border-b-4 border-primary drop-shadow-lg bg-gradient-to-b from-secondary1 to-primary";

</script>

<header class="">
    <Navbar class={navStyle}>
        <NavBrand href="/">
            <img class="mr-3 h-10 sm:h-12" src="https://fiwibusiness.com/wp-content/uploads/2016/07/HEART-NSTAT-Logo.jpg" alt="Job Ace Logo">
        </NavBrand>
        <span class={titleStyle} >Job Ace</span>
        <label class="flex" for="">
            <Input class="pl-10 text-accent border-accent" placeholder="search"/>
        </label>
        <NavUl>
            <NavLi class={li}>Home</NavLi>
            <NavLi class={li}>About Us</NavLi>
            <NavLi class={li}>Jobs</NavLi>
            <NavLi class={li}>Blog Post</NavLi>
            <NavLi class={li}>Employer</NavLi>
            <NavLi class={li}>Contact us</NavLi>
        </NavUl>
        <Button class={buttonStyle} >Get Started</Button>

    </Navbar>
</header>

<style>

</style>