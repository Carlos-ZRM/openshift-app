nmcli con add type bond ifname bond0
nmcli con add type ethernet ifname eth0 master bond0
nmcli con add type ethernet ifname eth4 master bond0

nmcli connection up bond-slave-enth0
nmcli connection up bond-slave-enth4


nmcli connection add type bridge con-name bridge0 ifname br0 ipv4.method manual ipv4.addresses 192.0.2.1/24
nmcli connection add type ethernet slave-type bridge con-name bridge0-port1 ifname bond0 master bridge0


nmcli connection add type bridge con-name bridge0 ifname bridge0 

nmcli connection add type bridge con-name bridge0 ifname bridge0
nmcli connection add type bridge-slave ifname bond0 master bridge0

nmcli connection modify bond0 master bridge0

nmcli connection modify bond0 ipv4.method disabled

nmcli connection modify bridge0 ipv4.addresses  '192.168.25.20/24' 

nmcli connection modify bond0 ipv4.addresses '192.0.2.1/24' ipv4.gateway '192.0.2.254' 
nmcli connection modify bridge0 ipv4.addresses '192.0.2.1/24' ipv4.gateway '192.168.25.255' ipv4.dns '192.0.2.253' ipv4.dns-search 'example.com' ipv4.method manual

nmcli connection modify br0 ipv4.addresses '192.168.25.20/24'
nmcli connection modify br0 ipv4.gateway '192.0.2.1/24'
nmcli connection modify br0 ipv4.method manual



nmcli connection up bridge0

nmcli con add ifname br0 type bridge con-name br0
nmcli con add type bridge-slave ifname bond0 master br0

nmcli connection show
nmcli con up br0
nmcli con show br0


===========
nmcli con show

nmcli connection add type bond con-name bond0 ifname bond0 bond.options "mode=active-backup"

nmcli connection add type bridge con-name bridge0 ifname bridge0 
nmcli connection add type bridge con-name bridge1 ifname bridge1
nmcli con show

nmcli connection add type ethernet slave-type bond con-name bond0-port1 ifname eth0 master bond0
nmcli connection add type ethernet slave-type bond con-name bond0-port2 ifname eth4 master bond0
nmcli con show


nmcli connection modify bridge0 master bond0
nmcli connection modify bridge1 master bond0
nmcli con show

nmcli connection up bridge0
nmcli connection up bridge1
nmcli device

nmcli connection modify bond0 ipv4.addresses '192.168.25.20/24' ipv4.gateway '192.168.25.254' 
nmcli connection up bond0
nmcli con show

=====

nmcli connection add type bridge con-name bridge1 ifname bridge1
nmcli connection modify bond0 master bridge1
nmcli connection up bond0
nmcli connection modify bridge0 ipv4.addresses '192.0.2.1/24' ipv4.gateway '192.0.2.254' ipv4.dns '192.0.2.253' ipv4.dns-search 'example.com' ipv4.method manual