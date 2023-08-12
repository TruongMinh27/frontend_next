import React, { FC, useContext } from "react";
import { Card, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ArrowClockwise, PersonFill } from "react-bootstrap-icons";
import StarRatingComponent from "react-star-rating-component";
import { useToasts } from "react-toast-notifications";
import { Context } from "../../context";
import { Products } from "../../services/product.service";
import { Rate } from "antd";

interface IProps {
  reviews: Record<string, any>[];
  productId: string;
}

const intialState = {
  rating: 0,
  review: "",
};

const ReviewSection: FC<IProps> = ({ reviews, productId }) => {
  const [filteredReviews, setFilteredReviews] = React.useState(reviews);
  const [allReviews, setAllReviews] = React.useState(reviews);
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = React.useState(false);
  const [reviewForm, setReviewFrom] = React.useState(intialState);
  const [filterValue, setFilterValue] = React.useState(0);
  const [formShown, setFormShown] = React.useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { rating, review } = reviewForm;
      if (!review || !rating) {
        addToast("Sai data", { appearance: "error", autoDismiss: true });
        return false;
      }

      const newReviewResponse = await Products.addReview(productId, reviewForm);
      if (newReviewResponse.success) {
        addToast(newReviewResponse.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
      setAllReviews(newReviewResponse.result.feedbackDetails);
      setFilteredReviews(newReviewResponse.result.feedbackDetails);
      setReviewFrom(intialState);
    } catch (error: any) {
      if (error.response) {
        if (Array.isArray(error.response?.data?.message)) {
          return error.response.data.message.forEach((message: any) => {
            addToast(message, { appearance: "error", autoDismiss: true });
          });
        } else {
          return addToast(error.response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (e: any, id: string) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const delProdRes = await Products.deleteReview(productId, id);
      addToast(delProdRes.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setAllReviews(delProdRes.result.feedbackDetails);
      setFilteredReviews(delProdRes.result.feedbackDetails);
      setReviewFrom(intialState);
    } catch (error: any) {
      if (error.response) {
        if (Array.isArray(error.response?.data?.message)) {
          return error.response.data.message.forEach((message: any) => {
            addToast(message, { appearance: "error", autoDismiss: true });
          });
        } else {
          return addToast(error.response.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {user && user.email && (
        <div>
          {!formShown && (
            <Button
              variant="outline-info"
              className="addReview"
              onClick={() => {
                setFormShown(true);
              }}
            >
              Thêm đánh giá & bình luận
            </Button>
          )}
          {formShown && (
            <div className="reviewInputZone">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Đánh giá của bạn</Form.Label>
                  <br />
                  <StarRatingComponent
                    name="rate2s"
                    starCount={5}
                    value={reviewForm.rating}
                    onStarClick={(nextValue) =>
                      setReviewFrom({ ...reviewForm, rating: nextValue })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Review của bạn</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewForm.review}
                    onChange={(e) =>
                      setReviewFrom({ ...reviewForm, review: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCheckbox"
                ></Form.Group>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setReviewFrom(intialState);
                    setFormShown(false);
                  }}
                >
                  Hủy
                </Button>{" "}
                {""}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Đăng
                </Button>
              </Form>
            </div>
          )}
          <hr />
        </div>
      )}

      <div className="filterRating flex items-center ">
        <h5>Lọc theo - </h5>
        {/* <StarRatingComponent
          name="rate2 -"
          starCount={5}
          value={filterValue}
          onStarClick={(number) => {
            const filteredAllReview: Record<string, any>[] =
              filteredReviews.filter((value) => value.rating === number);
            setAllReviews(filteredAllReview);
            setFilterValue(number);
          }}
        /> */}
        <Rate
          count={5}
          className="ml-1 [&>.ant-rate-star-zero>div>.ant-rate-star-second]:text-gray-500 mb-2"
          value={filterValue}
          onChange={(number) => {
            const filteredAllReview: Record<string, any>[] =
              filteredReviews.filter((value) => value.rating === number);
            setAllReviews(filteredAllReview);
            setFilterValue(number);
          }}
        />
        <Button
          className="ml-2 !border-none"
          variant="outline-secondary"
          onClick={() => {
            setAllReviews(filteredReviews);
            setFilterValue(0);
          }}
        >
          <ArrowClockwise />
        </Button>
      </div>
      <div className="reviewZone">
        {" "}
        {allReviews.map((review, index) => (
          <Card
            key={index}
            style={{ width: "100%" }}
            className="mb-2 dark:!bg-smoke dark:!text-white"
          >
            <Card.Header className="reviewHeader">
              <PersonFill className="personReview" />
              {review.customerName}{" "}
              <StarRatingComponent
                name="rate2"
                editing={false}
                starCount={5}
                value={review.rating}
              />
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <p className="reviewDt text-white">{review.updatedAt}</p>
                {review.feedbackMsg}
              </Card.Text>
              <Button
                variant="danger"
                onClick={(e) => handleDelete(e, review._id)}
                disabled={isLoading}
              >
                Xóa
              </Button>
            </Card.Body>
          </Card>
        ))}
        {allReviews.length < 1 && <h5>No reviews</h5>}
      </div>
    </div>
  );
};

export default ReviewSection;
