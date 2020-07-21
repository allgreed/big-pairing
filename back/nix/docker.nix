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
      # TODO: unhardcode python3.8
      "${app}/lib/python3.8/site-packages/back/src/main.py"
    ];

    ExposedPorts = {
      "8000/tcp" = {};
    };

    Env = [
      # TODO: unhardcode python3.8
      "PYTHONPATH=${app}/lib/python3.8/site-packages/back/"
    ];
  };
}
