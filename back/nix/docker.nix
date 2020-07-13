let
  pkgs = import ./pkgs.nix;
  app = import ./../default.nix;
in
pkgs.dockerTools.buildImage {
  name = "big-pairing-back";
  tag = "builded";

  created = "now";

  contents = app;

  config = {
    Cmd = [
      # TODO: unhardcode this
      "./nix/store/61brb5mnfp1kk84ah7wq5rb5hi80fz49-python3-3.8.2-env/bin/uvicorn"
      "src.main:app"
    ];

    ExposedPorts = {
      "8000/tcp" = {};
    };

    Env = [
      # TODO: unhardcode this
      "PYTHONPATH=${app}/lib/python3.8/site-packages/back/"
    ];
  };
}
