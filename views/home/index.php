<?php $url      = $this->helpers['URLHelper']->getURL(); ?>
<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Primeiro Projeto MVC</title>

    <!-- Youtube Font -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="<?php echo $url; ?>/assets/libs/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <!-- Custom styles for this template -->
    <link href="<?php echo $url; ?>/assets/css/general.css" rel="stylesheet">
  </head>

  <body>
      <main class="justify-content-center">
        <div class="container align-self-center  overflow-hidden">
          <div class="col-md-12 pb-3 p-lg-5 text-center">
            <h1 class="display-4 fw-normal mb-3 mb-md-5 mb-lg-5"><i class="fab fa-youtube"></i> Control Tube</h1>
            <div class="input-group">
              <input type="text" class="form-control form-control-lg" id="input-search" placeholder="Procurar Vídeos">
              <div class="input-group-text btn-search"><i class="fa fa-search" aria-hidden="true"></i></div>
            </div>
          </div>
          <h6 class="text-muted text-center mb-3" >Informe a quantidade de minutos que deseja limitar para cada dia</h6>
          <form class="form-durations">
            <div class="row row-cols-8 row-cols-xs-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-8 g-3">
              <div class="col">
                <div class="form-group ">
                  <input type="number" class="form-control input-day" name="day[0]" placeholder="Domingo" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[1]"  placeholder="Segunda" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[2]"  placeholder="Terça" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[3]" placeholder="Quarta" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[4]" placeholder="Quinta" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[5]" placeholder="Sexta" min="0">
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input type="number" class="form-control input-day" name="day[6]" placeholder="Sábado" min="0">
                </div>
              </div>
              <div class="col">
                <button type="button" class="btn btn-danger btn-block btn-search"><i class="fa fa-search" aria-hidden="true"></i></button>
              </div>
            </div>
        </form>
        </div>
      </main>

    <script type="text/javascript">
      var URL = "<?php echo $url ?>";
    </script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/jquery/jquery-3.5.1.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/popper/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/bootstrap/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/js/videos/videos.js"></script>
  </body>
</html>
