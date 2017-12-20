# blockchain-assignment

Repository for blockchain assignment (subject 12) in our system integration course, PBA software development at cphbusiness

## Notes

Peer to Peer Netværk 

Sådan er vores noder sat op:

![alt text](https://github.com/gode-ting/blockchain-assignment/blob/master/img/PeertoPeer.png "Peer to Peer")

## Bash script - Hvordan virker det?

1. wget https://raw.githubusercontent.com/gode-ting/blockchain-assignment/master/runBlockChain.sh til det ønskede system

2. sh runBlockChain.sh 

3. Scriptet henter de nødvendige filer og vil efterfølgende køre et testcase.

## Screen cast

![](https://github.com/gode-ting/blockchain-assignment/blob/master/img/screencast.png)

## References

[https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)

[https://github.com/vedmant/my-little-bitcoin](https://github.com/vedmant/my-little-bitcoin)

## IMPORTANT: Fejl & mangler

Vi har til sidst haft problemer med at synkronisere vores blockchain database over hele netværket. Vi har lavet et peer-to-peer netværk som virker når vi kører netværket lokalt (uden docker). Dvs at alle noder sybnkroniseres, således at de har den nyeste kopi at databasen. Men problemet opstår når vi forsøger at køre vores Blockchain via vores bash-script med docker-compose. Vi har desværre ikke haft tid til at finde fejlen, så vores release er ikke fuldent. Dette vil vi komme nærmere ind på til eksamen. 

