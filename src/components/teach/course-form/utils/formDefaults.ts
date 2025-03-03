
// Find the line where duration is defined incorrectly and make sure it's a string
export const defaultFormValues = {
  title: '',
  description: '',
  category: '',
  location: '',
  address: '',
  city: '',
  is_online: false,
  capacity: 1,
  price: 0,
  duration: "60", // Ensure duration is a string, not a number
  sessions: [],
  learning_outcomes: [''],
  requirements: [''],
  items_to_bring: [''],
  images: [],
  status: 'draft',
  min_participants: 1,
  max_participants: 10,
};
