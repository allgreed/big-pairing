# vim: set ft=hcl:
cat << EOF
job "bp" {
  datacenters = ["dc1"]

  group "front" {
    count = 1

    task "front" {
      driver = "docker"

      config {
        image = "allgreed/big-pairing-front:$VERSION"
        port_map = {
            http = 80
        }
      }

      resources {
        cpu    = 100
        memory = 50

        network {
            port "http" {
                static = "7035"
            }
        }
      }
    }
  }

  group "back" {
    count = 1

    task "back" {
      driver = "docker"

      env {
        DATABASE_CONNECTION_STRING = "sqlite:////sqlite.db"
      }

      config {
        image = "allgreed/big-pairing-back:latest"
        # TODO: remove the force_pull after figuring out nix-docker image builds on drone cloud
        force_pull = true
        port_map = {
            http = 8000
        }
        volumes = [
            "/var/eph/big-pairing/sqlite.db:/sqlite.db",
        ]
      }

      resources {
        cpu    = 500
        memory = 100

        network {
            port "http" {
                static = "7036"
            }
        }
      }
    }
  }

}
EOF
