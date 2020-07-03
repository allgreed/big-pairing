# vim: set ft=hcl:
cat << EOF
job "bp" {
  datacenters = ["dc1"]

  group "front" {
    count = 1

    task "front" {
      driver = "docker"

      config {
        #image = "allgreed/lmap:$VERSION"
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

      config {
        #image = "allgreed/lmap:$VERSION"
        #port_map = {
        #    http = 80
        #}
      }

      resources {
        cpu    = 100
        memory = 50

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
