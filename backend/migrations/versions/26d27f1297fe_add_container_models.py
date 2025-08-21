"""Add container models

Revision ID: 26d27f1297fe
Revises: 6fa47c2a5897
Create Date: 2025-08-21 13:23:47.444694

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '26d27f1297fe'
down_revision: Union[str, Sequence[str], None] = '6fa47c2a5897'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
