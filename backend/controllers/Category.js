import Category from '../models/Category.js';
import Course from '../models/Course.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const categoryDetails = await Category.create({ name, description });

    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: 'Category created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Show all categories
export const showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Show category details including selected, different and best-selling courses
export const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Selected category and its courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: 'courses',
        match: { status: 'Published' },
        populate: [{ path: 'instructor' }, { path: 'ratingAndReviews' }],
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    if (!selectedCategory.courses.length) {
      return res.status(404).json({
        success: false,
        message: 'No courses found for the selected category',
      });
    }

    const selectedCourses = selectedCategory.courses;

    // Courses from other categories
    const otherCategories = await Category.find({ _id: { $ne: categoryId } })
      .populate({
        path: 'courses',
        match: { status: 'Published' },
        populate: [{ path: 'instructor' }, { path: 'ratingAndReviews' }],
      });

    const differentCourses = otherCategories.flatMap(category => category.courses);

    // Get top-selling courses
    const allCategories = await Category.find().populate({
      path: 'courses',
      match: { status: 'Published' },
      populate: [{ path: 'instructor' }, { path: 'ratingAndReviews' }],
    });

    const allCourses = allCategories.flatMap(category => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      selectedCourses,
      differentCourses,
      mostSellingCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Add course to a category
export const addCourseToCategory = async (req, res) => {
  try {
    const { courseId, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const alreadyExists = category.courses.includes(courseId);
    if (alreadyExists) {
      return res.status(200).json({
        success: true,
        message: 'Course already exists in the category',
      });
    }

    category.courses.push(courseId);
    await category.save();

    return res.status(200).json({
      success: true,
      message: 'Course added to category successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
