<?php $url      = $this->helpers['URLHelper']->getURL(); ?>
<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

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
    <header>
      <div class="navbar navbar-dark shadow-sm">
        <div class="container">
          <div class="position-relative overflow-hidden align-self-center w-50">
              <div class="input-group">
                <input type="text" class="form-control form-control-lg" id="input-search" placeholder="Procurar Vídeos" value="<?= $search['search'] ?>">
                <div class="input-group-text btn-search"><i class="fa fa-search" aria-hidden="true"></i></div>
              </div>
          </div>
          <a class="btn btn-light" type="button" data-toggle="modal" data-target=".bd-example-modal-lg">
            <i class="fas fa-sliders-h"></i>  
          </a>
        </div>
      </div>
     
    </header>
    <main>
      <div class="album py-5 bg-light h-100">
        <div class="container">
          <div class="row row-cols-1 g-3 mt-3">
            
          </div>
        </div>
      </div>
    </main>
    <div class="tamplete video d-none">
      <div class="col my-3 video-content">   
        <div class="alert alert-warning" role="alert">
          Nenhum vídeo para assistir
        </div>         
        <div class="card shadow-sm d-none">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="https://i.ytimg.com/vi/HrvTsw8GLMI/mqdefault.jpg" >
              <small class="min">4:20</small>
            </div>
            <div class="col-md-8 d-flex flex-column">
              <div class="card-body d-flex flex-column">
                <h5></h5>
                <p class="card-text"></p>
                <div class="d-flex justify-content-between mt-auto align-items-center">
                  <div class="tags w-75">
                    <small></small>
                  </div>
                  <small class="text-muted">01/03/2018</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="justify-content-center" id="loader-content"> 
      <div class="box position-relative align-self-center" >
        <div class="loader"></div>
      </div>
    </div>

    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <form class="form-durations">
                 <div class="row row-cols-4 row-cols-xs-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3">
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[0]" placeholder="Domingo" min="0" value="<?= $search['day'][0] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[1]" placeholder="Segunda" min="0" value="<?= $search['day'][1] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day"  name="day[2]" placeholder="Terça" min="0" value="<?= $search['day'][2] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[3]" placeholder="Quarta" min="0" value="<?= $search['day'][3] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[4]" placeholder="Quinta" min="0" value="<?= $search['day'][4] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[5]" placeholder="Sexta" min="0" value="<?= $search['day'][5] ?>">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <input type="number" class="form-control input-day" name="day[5]" placeholder="Sábado" min="0" value="<?= $search['day'][6] ?>">
                    </div>
                  </div>
                   <div class="col">
                      <button type="button" class="btn btn-danger btn-block"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
    <script type="text/javascript">
      var URL = "<?php echo $url ?>";
    </script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/jquery/jquery-3.5.1.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/popper/popper.min.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/libs/bootstrap/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/js/youtube_api/api.js"></script>
    <script type="text/javascript" src="https://apis.google.com/js/client.js?onload=loadClient"></script>
    <script type="text/javascript" src="<?php echo $url; ?>/assets/js/videos/videos.js"></script>
  </body>
</html>
