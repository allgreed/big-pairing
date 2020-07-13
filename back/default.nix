let
  pkgs = import ./nix/pkgs.nix;
  pythonCore = pkgs.python38;
  pythonPkgs = python-packages: with python-packages; [
      # TODO: figure out how to keep this out of the generate Docker container
      pytest

      sqlalchemy
      fastapi
      uvicorn
    ]; 
  myPython = pythonCore.withPackages pythonPkgs;
in
pkgs.stdenv.mkDerivation rec {
  name = "back";
  src = ./.;

  installPhase = ''
    runHook preInstall
    
    mkdir -p $out/${myPython.sitePackages}
    cp -r . $out/${myPython.sitePackages}/${name}

    runHook postInstall
  '';

  propagatedbuildInputs =
    with pkgs;
    [
      sqlite
      git
      gnumake
      entr
      # this is only for the shell

      myPython
      # this is a requirement
    ];
  buildInputs = propagatedbuildInputs;
}
