from rest_framework import permissions

class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow owners or admins.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are allowed for owners or admins.
        try:
            return obj.user == request.user or request.user.is_staff
        except AttributeError:
            return obj == request.user or request.user.is_staff
        