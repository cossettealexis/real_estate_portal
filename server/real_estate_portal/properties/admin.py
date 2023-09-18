from django.contrib import admin

from .models import (
    Properties,
    Pictures,
    RelatedCost,
    CostType,
    ProjectedRentalExpense,
    ExpenseCategory,
    PropertyStock,
    PropertyInvestor,
    Amenity,
    Category,
)


admin.site.register(Properties)
admin.site.register(Pictures)
admin.site.register(RelatedCost)
admin.site.register(CostType)
admin.site.register(ProjectedRentalExpense)
admin.site.register(ExpenseCategory)
admin.site.register(PropertyStock)
admin.site.register(PropertyInvestor)
admin.site.register(Amenity)
admin.site.register(Category)
