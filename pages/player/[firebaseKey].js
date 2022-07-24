import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { viewPlayerDetails } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';

function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="player-cards">
      <Card className="indCard" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <Card.Img variant="top" src={playerDetails.imageUrl} alt={playerDetails.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{playerDetails.name}</Card.Title>
          <p className="card-subtitle mb-2 text-muted">{playerDetails.position}</p>
          <Link href={`/player/edit/${playerDetails.firebaseKey}`} passHref>
            <Button className="edit-btn" variant="info">EDIT</Button>
          </Link>
        </Card.Body>
      </Card>
      {playerDetails.players?.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} />
      ))}
    </div>
  );
}

export default ViewPlayer;