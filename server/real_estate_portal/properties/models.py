from django.conf import settings
from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify

from core.utils import upload_to


CATEGORY_CHOICES = (("S", "Rented"), ("SW", "Vacation Rental"), ("OW", "Resedential"))

LABEL_CHOICES = (("P", "primary"), ("S", "secondary"), ("D", "danger"))

ADDRESS_CHOICES = (
    ("B", "Billing"),
    ("S", "Shipping"),
)


class Category(models.Model):
    category_name = models.CharField(
        max_length=100, blank=False, null=False, db_column="category_name"
    )

    class Meta(object):
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        db_table = "category"

    def __str__(self):
        return self.category_name


class Pictures(models.Model):
    """
    Model representing pictures.
    """
    picture = models.FileField(upload_to=upload_to(None, filename='properties'), blank=False, null=False, db_column="picture")
    index = models.CharField(max_length=100, blank=True, null=True, db_column="index")
    isVideo = models.BooleanField(blank=True, null=True, db_column="is_video")

    class Meta(object):
        verbose_name = "Picture"
        verbose_name_plural = "Pictures"
        db_table = "picture"

    def __str__(self):
        return self.picture.url


class Properties(models.Model):
    """
    Model representing a property.
    """
    name = models.CharField(
        max_length=100, unique=True, blank=False, null=False, db_column="name"
    )
    address1 = models.CharField(
        max_length=100, blank=False, null=True, db_column="address1"
    )
    address2 = models.CharField(
        max_length=100, blank=True, null=True, db_column="address2"
    )
    city = models.CharField(max_length=100, blank=False, null=False, db_column="city")
    state = models.CharField(max_length=100, blank=True, null=True, db_column="state")
    zip = models.IntegerField(blank=False, null=False, db_column="zip")
    country = models.CharField(
        max_length=100, blank=False, null=False, db_column="country"
    )
    
    type = models.ForeignKey(
        Category, blank=False, null=False, db_column="type", on_delete=models.CASCADE
    )
    bed = models.IntegerField(blank=False, null=False, db_column="bed")
    bath = models.IntegerField(blank=False, null=False, db_column="bath")
    squareFeet = models.FloatField(
        verbose_name="Square Feet", blank=False, null=False, db_column="square_feet"
    )
    buildYear = models.IntegerField(
        verbose_name="Build Year", blank=False, null=False, db_column="build_year"
    )
    purchasePrice = models.DecimalField(
        verbose_name="Purchase Price",
        max_digits=10,
        decimal_places=2,
        blank=False,
        null=False,
        db_column="purchase_price",
    )
    image = models.ForeignKey(
        Pictures,
        verbose_name="Picture",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        db_column="picture",
    )
    longDesc = models.TextField(
        verbose_name="Description", blank=True, null=True, db_column="long_desc"
    )
    projectedRent = models.DecimalField(
        verbose_name="Projected rent",
        max_digits=10,
        decimal_places=2,
        blank=False,
        null=False,
        db_column="projected_rent",
    )
    rentalStatus = models.CharField(
        max_length=50, blank=True, null=True, db_column="rental_status"
    )
    slug = models.SlugField()

    class Meta(object):
        verbose_name = "Property"
        verbose_name_plural = "Properties"
        db_table = "property"

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Properties, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("core:property", kwargs={"slug": self.slug})

    @property
    def formatted_type(self):
        return self.type.category_name.lower().replace(" ", "-")


class RelatedCost(models.Model):
    propertyId = models.ForeignKey(
        Properties,
        verbose_name="Property",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="property_id",
    )
    costTypeId = models.IntegerField(
        verbose_name="Cost type id", blank=True, null=True, db_column="cost_type_id"
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True, db_column="amount"
    )

    class Meta(object):
        db_table = "related_cost"

    def __str__(self):
        return self.pk


class CostType(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True, db_column="name")
    category = models.CharField(
        max_length=50, blank=True, null=True, db_column="category"
    )

    class Meta(object):
        db_table = "cost_type"


class ExpenseCategory(models.Model):
    expCategoryName = models.CharField(
        max_length=50, blank=False, null=False, db_column="name"
    )

    class Meta(object):
        verbose_name = "Expense category"
        verbose_name_plural = "Expense categories"
        db_table = "expense_category"


class Amenity(models.Model):
    amenity = models.TextField(
        verbose_name="Amenity", blank=True, null=True, db_column="amenity"
    )
    property = models.ForeignKey(
        Properties,
        verbose_name="Property",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        db_column="property_id",
    )

    class Meta(object):
        verbose_name = "Amenity"
        verbose_name_plural = "Amenities"
        db_table = "amenity"


    def __str__(self):
        return self.property.name + " - " + self.amenity


class ProjectedRentalExpense(models.Model):
    propertyId = models.ForeignKey(
        Properties,
        verbose_name="Property",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="property_id",
    )
    expCategoryId = models.ForeignKey(
        ExpenseCategory,
        verbose_name="Expense Category",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="expense_category_id",
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True, db_column="amount"
    )

    class Meta(object):
        verbose_name = "Projected rental expense"
        verbose_name_plural = "Projected rental expenses"
        db_table = "projected_rental_expense"


class UserInvestorProfile(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="User",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="user_id",
    )

    class Meta(object):
        db_table = "user_investor_profile"


class PropertyStock(models.Model):
    propertyId = models.ForeignKey(
        Properties,
        verbose_name="Property",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="property_id",
    )
    initialStockValue = models.FloatField(
        verbose_name="Initial Stock value",
        blank=True,
        null=True,
        db_column="square_feet",
    )
    initialNumberOfStocks = models.IntegerField(
        blank=True, null=True, db_column="initial_number_of_stocks"
    )

    class Meta(object):
        verbose_name = "Property stock"
        verbose_name_plural = "Property stocks"
        db_table = "property_stock"


class PropertyInvestor(models.Model):
    propertyId = models.ForeignKey(
        Properties,
        verbose_name="Property",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        db_column="property_id",
    )
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="User",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="user_id",
    )
    numberOfStocks = models.IntegerField(
        blank=True, null=True, db_column="number_of_stocks"
    )

    class Meta(object):
        verbose_name = "Property investor"
        verbose_name_plural = "Property investors"
        db_table = "property_investor"
