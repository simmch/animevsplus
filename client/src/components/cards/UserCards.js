import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import Spinner from '../isLoading/spinner';
import axios from 'axios';

const UserCards = ({ auth }) => {
  const [userCards, setUserCards] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    axios.get(`/crown/users/${auth.user.data.DID}/cards`)
      .then((res) => {
        setUserCards({ data: res.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
        setUserCards({ data: [], loading: false });
      });
  }, [auth]);

  const handleDelete = async (cardName) => {
    if (window.confirm(`Are you sure you want to delete ${cardName}?`)) {
      try {
        await axios.delete(`/crown/users/${auth.user.data.DID}/card/${cardName}`);
        setUserCards(prev => ({
          ...prev,
          data: {
            ...prev.data,
            userCards: prev.data.userCards.filter(card => card !== cardName),
            fullCardData: prev.data.fullCardData.filter(card => card.NAME !== cardName)
          }
        }));
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  if (userCards.loading || auth.loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h2 className="my-4">My Cards</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {userCards.data.fullCardData.map((card) => (
          <Col key={card.NAME}>
            <Card>
              <Card.Img variant="top" src={card.PATH} alt={card.NAME} />
              <Card.Body>
                <Card.Title>{card.NAME}</Card.Title>
                <Card.Text>
                  Universe: {card.UNIVERSE}
                  <br />
                  Tier: {card.TIER}
                  <br />
                  Class: {card.CLASS}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(card.NAME)}
                  className="w-100"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserCards);