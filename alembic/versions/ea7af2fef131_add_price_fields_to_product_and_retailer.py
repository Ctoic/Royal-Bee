"""add price fields to product and retailer

Revision ID: ea7af2fef131
Revises: 
Create Date: 2025-07-22 11:27:04.511517

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ea7af2fef131'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('price', sa.Float(), nullable=True))
    op.add_column('retailers', sa.Column('price', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('retailers', 'price')
    op.drop_column('products', 'price')
    # ### end Alembic commands ###
