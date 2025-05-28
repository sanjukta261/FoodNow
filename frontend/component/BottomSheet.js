import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import css from '../component/css'
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

const BottomSheet = ({ visible, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [slideAnim] = useState(new Animated.Value(BOTTOM_SHEET_HEIGHT));

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : BOTTOM_SHEET_HEIGHT,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      if (!visible) onClose();
    });
  }, [visible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        handleClose();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: BOTTOM_SHEET_HEIGHT,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      onClose();
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
     setQuantity(1);
    handleClose();
  };

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={css.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          css.sheetContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={css.dragHandleWrapper}>
          <View style={css.dragHandle} />
        </View>

        <View style={css.content}>
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={css.bottomSheetItemImage}
            resizeMode="cover"
          />

          <Text style={css.bottomSheetItemName}>{item.name}</Text>
          <Text style={css.bottomSheetItemDescription}>{item.description}</Text>

          <View style={css.bottomSheetItemPriceRow}>
            <Text style={css.bottomSheetItemPriceText}>₹{item.price.toFixed(2)}</Text>
            <View style={css.bottomSheetItemRatingRow}>
              <Text style={css.bottomSheetItemRatingText}>⭐ {item.rating}</Text>
              <Text style={css.prepTimeText}>• {item.prepTime}</Text>
            </View>
          </View>

          <View style={css.quantitySelector}>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={css.quantityBtn(quantity > 1)}
              disabled={quantity <= 1}
            >
              <Text style={css.addToCartText}>-</Text>
            </TouchableOpacity>

            <Text style={css.quantityText}>{quantity}</Text>

            <TouchableOpacity
              onPress={incrementQuantity}
              style={css.quantityBtn(true)}
            >
              <Text style={css.addToCartText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleAddToCart} style={css.addToCartBtn}>
            <Text style={css.addToCartText}>
              Add to Cart • ₹{(item.price * quantity).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
