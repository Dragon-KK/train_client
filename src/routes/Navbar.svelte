<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
</script>

<Navbar>
<NavBrand href="/">
    <img src="https://picsum.photos/200/100" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FTCB</span>
</NavBrand>
<div class="flex md:order-2">
    <Button size="sm" class="px-4">Login</Button>
    <NavHamburger />
</div>
<NavUl class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/contact">Contact</NavLi>
</NavUl>
</Navbar>