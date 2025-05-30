import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

const css = StyleSheet.create({
  splashScreenContainer: {
    backgroundColor: "#102E50",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  splashScreenLogo: {
    width: 130,
    height: 130,
  },
  primaryButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: "55%",
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 0,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
  },
  yourRoleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  dropDownContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  pickerWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#041C4D",
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },

  dropDownIcon: {
    marginRight: 10,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  pageContent: {
    backgroundColor: "white",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  navBar: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "white",
    justifyContent: "space-between",
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 4,
  },
  navBarTitle: {
    color: "black",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 30,
  },
  searchBar: {
    //for any changes inside the searchBarContainer
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  currentCanteenDashboard: {
    width: "100%",
    backgroundColor: "#102E50",
    borderRadius: 20,
    height: 120,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  currentCanteenDashboardText: {
    color: "white",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  itemContainer: {
    width: 140,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 30,
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#102E50",
    textAlign: "left",
  },
  itemRating: {
    fontSize: 10,
    color: "#888",
  },
  priceRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
},
  // Add these to your css file:

  categoryScrollView: {
    marginVertical: 16,
    marginHorizontal: -20, // Offset parent padding
  },

  categoryScrollContent: {
    paddingHorizontal: 20,
    paddingRight: 40, // Extra scroll space
  },

  categoryButton: {
    marginRight: 20,
    paddingHorizontal: 4,
    paddingVertical: 8,
    minHeight: 40,
  },

  categoryText: {
    fontSize: 16,
    paddingBottom: 4,
    textAlign: "left",
  },

  categoryTextActive: {
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#102E50",
  },

  categoryTextInactive: {
    fontWeight: "normal",
    color: "#888",
    borderBottomWidth: 0,
  },

  foodItemCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  foodItemImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  foodItemsGrid: {
    marginHorizontal: -20, // Offset parent padding
  },

  foodItemsGridColumn: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  foodItemsGridContent: {
    paddingBottom: 100,
    paddingTop: 0,
  },
  //bottom sheets css
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dragHandleWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  bottomSheetItemName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  bottomSheetItemDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  bottomSheetItemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetItemPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102E50',
  },
  bottomSheetItemRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetItemrRatingText: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  prepTimeText: {
    fontSize: 14,
    color: '#888',
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  quantityBtn: (enabled = true) => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: enabled ? '#102E50' : '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartBtn: {
    backgroundColor: '#102E50',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cartHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  order: {
    fontSize: 20,
    color: '#444',
    marginBottom: 15,
    textAlign: "left",
    marginLeft: 20,
  },
  list: {
    paddingBottom: 120,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#102E50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCard: {
  backgroundColor: '#fff',
  marginVertical: 10,
  padding: 15,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
},
orderTitle: { 
  fontSize: 18, 
  fontWeight: 'bold', 
  marginBottom: 5
 },
customerName: {
  fontSize: 14, 
  marginBottom: 5,
 },
itemList: { 
  marginBottom: 5 
},
orderItemText: { 
  fontSize: 14, 
  marginLeft: 10 
},
totalAmount: { 
  fontSize: 16, 
  fontWeight: '600', 
  marginVertical: 5 
},
orderStatus: { 
  fontSize: 14, 
  marginBottom: 10 
},
btnText: { 
  color: '#fff', 
  textAlign: 'center', 
  fontWeight: 'bold' 
},

});

export default css;
