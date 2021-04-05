<header class="masthead mb-auto p-3">
  <div class="inner container ">
    <h3 class="masthead-brand">Logo</h3>
    <nav class="nav nav-masthead justify-content-center">
      <a class="nav-link <?php echo $location == '' || $location == '/' ? 'active' : '' ?>" href="<?php echo $url; ?>/">Home</a>
      <a class="nav-link <?php echo $location == 'registro' ? 'active' : '' ?>" href="<?php echo $url; ?>/registro">Registro</a>
      <a class="nav-link <?php echo $location == 'contato' ? 'active' : '' ?>" href="<?php echo $url; ?>/contato">Contato</a>
      <a class="nav-link <?php echo $location == 'login' ? 'active' : '' ?>" href="<?php echo $url; ?>/login">Login</a>
    </nav>
  </div>
</header>