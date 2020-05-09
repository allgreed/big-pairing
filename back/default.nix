let
  pkgs = import ./nix/pkgs.nix;
  pythonCore = pkgs.python38;
  pythonPkgs = python-packages: with python-packages; [
      #fastapi - wanted to try fastapi, yet it fails on license collision => try again soon! [update channel]
      flask
      flask-cors
      #gunicorn
    ]; 
  myPython = pythonCore.withPackages pythonPkgs;
in
pkgs.mkShell {
  buildInputs =
  with pkgs;
  [
    myPython
    git
    gnumake
    entr
  ];
}
